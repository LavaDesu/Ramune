// PS: this script was wrote after hours of pain and suffering, it
// definitely needs some refactoring
//
// All this does is fix some documentation issues with us using
// merged union and constant types in src/Enums.ts
// It does this by deleting the type from the Type Aliases section
// and keeping only the type in the Variables section

import { Application, Reflection, ReflectionKind, TSConfigReader } from "typedoc";

async function main() {
    const app = new Application();

    app.options.addReader(new TSConfigReader());
    app.bootstrap({
        entryPoints: ["./src/index.ts"],
        excludeInternal: true,
        excludePrivate: true,
        name: "Ramune",
        out: "./docs",
        disableSources: true,
        readme: "./README.md",
        tsconfig: "./tsconfig.all.json"
    });

    const project = app.convert();

    if (!project || !project.children || !project.groups)
        throw new Error("Project failed to convert");

    const children = project.children;
    const groups = project.groups;

    const enums: Record<string, Reflection> = {};
    [...children].forEach(child => {
        if ((child.kind !== ReflectionKind.TypeAlias) &&
            (child.kind !== ReflectionKind.Variable))
            return;

        if (!(child.name in enums)) {
            enums[child.name] = child;
            return;
        }

        const typeAliasChildren = groups.find(group => group.kind === ReflectionKind.TypeAlias)?.children;
        if (!typeAliasChildren)
            throw new Error("Missing TypeAliasChildren");

        let target: Reflection;

        if (child.kind === ReflectionKind.TypeAlias)
            target = child;
        else if (child.kind === ReflectionKind.Variable)
            target = enums[child.name];
        else
            return;

        const typeIndex = typeAliasChildren.indexOf(
            typeAliasChildren.find(typeChild => typeChild.id === target.id)!
        );
        const childIndex = children.indexOf(
            children.find(subChild => subChild.id === target.id)!
        );
        if (typeIndex < 0 || childIndex < 0)
            return;

        children.splice(childIndex, 1);
        typeAliasChildren.splice(typeIndex, 1);
        console.log("deleting", target.name, target.id);
    });

    await app.generateDocs(project, "./docs");
    await app.generateJson(project, "./docs/meta.json");
}

main();
