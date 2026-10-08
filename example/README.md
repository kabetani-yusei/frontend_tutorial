# うさぎの投稿アプリを作ろう

![完成イメージ](./screenshot.webp)

触るのは `src/` の中の **3ファイルだけ** です。

| ファイル | 役割 |
| --- | --- |
| `App.jsx` | 画面の中身と動き（HTML + JavaScript） |
| `App.css` | アプリの見た目 |
| `index.css` | ページ全体の色や文字 |

ファイルを保存すると、ブラウザが自動で更新されます。

---

## ステップ0：画像を置く

[rabbit.webp](./src/assets/rabbit.webp) をダウンロードして、`myapp/src/assets/` に保存します。

---

## ステップ1：HTML で画面を作る

`src/App.jsx` の中身を [このコード](./steps/1-html/App.jsx) に置き換えます。

React では `.jsx` ファイルの中に HTML を書きます（**JSX** といいます）。
普通の HTML との違いは2つだけ：

- `class` → `className`
- `{ }` の中に JavaScript を書ける

> 見た目が崩れていても OK。次のステップで整えます。

---

## ステップ2：CSS で見た目を整える

次の2ファイルの中身を置き換えます。

- `src/index.css` → [このコード](./src/index.css)
- `src/App.css` → [このコード](./src/App.css)

使っている新しめの CSS：

| 書き方 | できること |
| --- | --- |
| `light-dark(白, 黒)` | ダークモードに自動対応 |
| `&`（ネスト） | 関連するスタイルをまとめて書ける |
| `field-sizing: content` | 入力欄が文字に合わせて伸びる |

---

## ステップ3：JavaScript で動かす

`src/App.jsx` の中身を [このコード](./src/App.jsx) に置き換えます。
これで完成です！投稿・削除ができ、再読み込みしても消えません。

ポイントは3つ：

| コード | 意味 |
| --- | --- |
| `useState` | 変わるデータ（投稿の一覧）を持つ。変わると画面も自動で変わる |
| `<form action={addPost}>` | 投稿ボタンで `addPost` が呼ばれる |
| `posts.map(...)` | 一覧を1件ずつ画面に並べる |

---

## 🔒 安全に公開するために

完成コードには、次の対策が入っています。

- **XSS 対策**：`{post.text}` のように表示すれば React が無害化します。`dangerouslySetInnerHTML` は使わない
- **保存データを信用しない**：読み込んだデータの形をチェックしてから使う（`loadPosts`）
- **CSP**：許可したファイル以外は読み込ませない。[vite.config.js](./vite.config.js) を自分の `myapp` にコピーすれば有効になります
- **ライブラリの脆弱性チェック**：ときどき `npm audit` を実行する

> サーバーにデータを保存するようになったら、入力チェックはサーバー側でも必ず行いましょう。

---

## 🚀 次のステップ

- 公開してみる：`npm run build` でできた `dist/` を [Cloudflare Pages](https://pages.cloudflare.com/) や [Vercel](https://vercel.com/) へ
- 部品に分ける：投稿フォームや投稿1件を別のファイル（コンポーネント）にする
- TypeScript を使う：`--template react-ts` で始めると、ミスを事前に見つけられる
