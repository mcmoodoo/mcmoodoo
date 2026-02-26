{
  description = "Dev shell providing latest runpodctl CLI from GitHub";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };

        runpodctl-latest = pkgs.stdenv.mkDerivation {
          pname = "runpodctl";
          version = "v2.1.0";

          src = pkgs.fetchurl {
            url = "https://github.com/runpod/runpodctl/releases/download/v2.1.0/runpodctl-linux-amd64.tar.gz";
            hash = "sha256-96pJQHqNLY1EUgk4zp62bZ2C4heKwD9a3qGLnMAM9o0=";
          };

          nativeBuildInputs = [ pkgs.autoPatchelfHook ];

          unpackPhase = "true";
          installPhase = ''
            mkdir -p $out/bin
            tar -xzf $src -C $out/bin
            chmod +x $out/bin/runpodctl
          '';
        };
      in {
        packages.default = runpodctl-latest;

        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            runpodctl-latest
          ];
        };
      });
}

