# S2S
## 概要
S2Sは、テスト用の骨組みを構築したプロジェクトです。

## ディレクトリ構造
```
app/
   ├── backend/
   │   ├── .env                   # 環境変数設定ファイル
   │   ├── .env.example           # 環境変数サンプルファイル
   │   ├── package-lock.json
   │   ├── package.json
   │   ├── tsconfig.json          # TypeScriptの設定ファイル
   │   └── src/
   │       ├── server.ts          # サーバのエントリポイント
   │       ├── models/            # データモデルの定義ディレクトリ
   │       ├── requests/          # リクエストバリデーションの定義
   │       ├── utils/             # ユーティリティ関数やヘルパー関数
   │       ├── controllers/       # コントローラディレクトリ
   │       ├── routes/            # ルーティングの定義ディレクトリ
   │       ├── middleware/        # ミドルウェアの定義ディレクトリ
   │       ├── views/             # EJSテンプレートのディレクトリ
   │       └── public/            # 静的ファイルのディレクトリ
   └── frontend/
       ├── .env                   # 環境変数設定ファイル
       ├── .env.example           # 環境変数サンプルファイル
       ├── package-lock.json
       ├── package.json
       ├── vite.config.js         # Viteの設定ファイル
       └── src/
           └── client/
               ├── index.html     # ReactのエントリポイントHTML
               └── main.tsx       # ReactのエントリポイントTSX
```

## 開発環境
### 共通
* Node.js
### バックエンド
* Express
* TypeScript
### フロントエンド
* React
* TypeScript
* Vite

## 使い方
### 必要なモジュールのインストール
まず、プロジェクトのルートディレクトリに移動し、frontend と backend の両方で依存関係をインストールします。
```bash
# バックエンドの依存関係をインストール
cd app/backend
npm install

# フロントエンドの依存関係をインストール
cd ../frontend
npm install
```
### 環境変数の設定
それぞれのディレクトリ（frontend と backend）に .env.example が含まれています。これを .env としてコピーし、必要な設定を行ってください。
```bash
cd app/backend
cp .env.example .env

cd ../frontend
cp .env.example .env
```
### デベロップメントサーバの起動
下記のコマンドで、同時にフロントエンドとバックエンドのデベロップメントサーバを起動できます。
```bash
npm run dev
```
### ブラウザでアクセス
デフォルトでは、フロントエンドは `http://localhost:3000` で、バックエンドは `http://localhost:3001` で実行されます。
