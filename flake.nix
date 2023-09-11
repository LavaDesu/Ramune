{
  description = "nix dev environment";

  inputs.flake-utils.url = "github:numtide/flake-utils";

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem(system:
    let
      pkgs = nixpkgs.legacyPackages.${system};
    in rec {
      devShell = pkgs.mkShell {
        buildInputs = with pkgs; [ nodejs-18_x ];
        shellHook = ''
          export PATH="$(readlink -f ./node_modules/.bin):$PATH"
        '';
      };
    });
}
