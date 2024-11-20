# Nix Flake: 依存関係を統一的に管理し、バ＝ジョンを固定する。
# Nix 公式はドキュメントなんて丁寧なものを書いてくれないので、適当な Zenn の記事読み漁るか Youtube で Nix 人の動画見るかして勉強してください。

# Init Command: `nix flake init`
# 必須: flake.lock
# 推奨: .envrc
{
  description = "Templates"; # パッケージの説明。置き換えなくても動くが、多分置き換えたいだろう。

  inputs = {
    # <template repeat desc="outputs の引数に入る入力のリスト" example="fenix.url=\"...\"" />
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { nixpkgs, flake-utils, ... }: flake-utils.lib.eachDefaultSystem (system:
    let
      pkgs = import nixpkgs { inherit system; };
    in
    {
      devShell = pkgs.mkShell {
        name = "devshell";
        src = ./.;
        buildInputs = with pkgs; [
          bun
          nodejs
        ];
      };
    });
}
