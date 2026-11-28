# MyToDo_App

**日々のタスクを整理し、期限と優先度を意識して管理するTodoアプリです。**

[アプリを開く](https://zassou-robo.github.io/MyToDo_App/)

タスクの登録・編集・削除といった基本的な管理機能に加え、検索や並び替え、進捗状況を確認できるダッシュボードを実装しています。

さらに、Cloudflare Workers・D1・Discord Webhookを利用した通知機能を導入し、期限が近い未完了タスクを毎日Discordにまとめて通知します。

PC・スマートフォンの両方から利用でき、タスクの状況を直感的に把握できることを目指しました。

## 画面・機能紹介

### 1. メイン画面

![メイン画面](./screenshots/main.png)
![メイン画面](./screenshots/main2.png)

タスク一覧とダッシュボードを表示するメイン画面です。

### 2. タスクの追加

![タスク追加](./screenshots/add-todo.png)

タスク名・優先度・期限・メモを設定して、新しいタスクを登録できます。

### 3. タスクの編集

![タスク編集](./screenshots/edit-todo.png)

登録済みタスクの内容・期限・優先度・メモを変更できます。

### 4. 検索・絞り込み・並び替え

![検索と並び替え](./screenshots/search-sort.png)

タスク名での検索や、完了状態・優先度・期限に応じた管理ができます。

### 5. ダッシュボード

![ダッシュボード](./screenshots/dashboard.png)

タスクの総数、完了数、未完了数、完了率などを確認できます。

### 6. Todoの一覧表示

![一覧表示](./screenshots/todo-list.png)

タイトル、優先度、期限をカードで管理しています。期限の近さに応じて色分けしています。

## 主な機能

### タスク管理

- タスクの追加
- タスクの編集
- タスクの削除
- 完了・未完了の切り替え
- 優先度の設定（高・中・低）
- 期限の設定
- メモの登録・編集
- 入力内容のチェック

### 検索・並び替え

- タスク名による検索
- 完了・未完了による絞り込み
- 優先度による並び替え
- 期限による並び替え
- 登録順による並び替え

### ダッシュボード

- 全タスク数・完了数・未完了数の表示
- タスク完了率の表示
- 優先度の高い未完了タスク数の表示
- 7日以内が期限のタスクの表示
- 期限切れタスクの表示

### Discord通知

Cloudflare WorkersとDiscord Webhookを利用し、Todoの期限をDiscordで確認できるようにしています。

毎日0:00（日本時間）に、以下の条件に該当する未完了タスクをまとめて通知します。

- 今日が期限のタスク
- 明日が期限のタスク
- 3日後が期限のタスク

通知は1日1回のまとめ形式です。完了済みタスクは通知対象から除外されます。

タスクの追加・編集・削除・完了状態の変更は、Cloudflare Workersを経由してD1データベースにも反映されます。

## システム構成

### 全体構成

```text
ユーザー
  |
  v
React + TypeScript
  |
  +---- LocalStorage
  |       |
  |       +---- ブラウザ内のTodoデータ保存
  |
  v
Cloudflare Workers
  |
  +---- Cloudflare D1
  |       |
  |       +---- Todoデータ管理
  |
  +---- Discord Webhook
          |
          +---- Discordへの通知
```

### 各サービスの役割

| サービス | 用途 |
|---|---|
| GitHub Pages | Webアプリの公開 |
| GitHub Actions | ビルド・自動デプロイ |
| LocalStorage | ブラウザ内のTodoデータ保存 |
| Cloudflare Workers | フロントエンドとD1の連携、通知処理 |
| Cloudflare D1 | Todoデータの保存 |
| Cloudflare Cron Triggers | 毎日の定期通知処理 |
| Discord Webhook | Discordへの通知送信 |

### 通知の仕組み

Cloudflare Cron Triggersを利用し、毎日0:00（日本時間）にWorkerを実行します。

Cron式：

```text
0 15 * * *
```

CloudflareのCronはUTC基準のため、UTC 15:00は日本時間の翌日0:00に相当します。

WorkerはD1から未完了のTodoを取得し、期限が今日・明日・3日後に該当するタスクを抽出して、Discordにまとめて送信します。

## 工夫した点

### 期限と優先度を意識したタスク管理

タスクに優先度と期限を設定できるようにしました。

さらに、期限が近いタスクや期限切れのタスクを色分けすることで、対応が必要なタスクを見つけやすくしています。

### ダッシュボードによる進捗の可視化

タスクの総数や完了率などをまとめて表示するダッシュボードを実装しました。

また、期限が7日以内のタスクや期限切れのタスクを一覧表示することで、今後取り組むべきタスクを把握しやすくしました。

### データの永続化

LocalStorageを利用し、ブラウザを再読み込みしてもタスクの情報が保持されるようにしました。

さらに、Cloudflare WorkersとD1を組み合わせることで、通知処理に必要なTodo情報をブラウザ外でも管理できるようにしました。

### Discordによる期限管理

期限が近いタスクをDiscordに通知することで、アプリを開いていないときでもタスクの期限を確認できるようにしました。

個別に何度も通知する方式ではなく、毎日1回のまとめ通知にすることで、通知の回数を抑えています。

### コンポーネントによる機能の分割

Reactのコンポーネントを利用して、ヘッダー・タスク項目・ダッシュボードなどに機能を分割しました。

各コンポーネントに必要なデータや関数をPropsとして渡すことで、役割を分けた構成にしています。

## 使用技術

| 技術 | 用途 |
|---|---|
| React | UIの構築 |
| TypeScript | 型定義・型安全な開発 |
| Vite | 開発環境・ビルド |
| HTML | ページ構造 |
| CSS | デザイン・レスポンシブ対応 |
| LocalStorage | ブラウザ内のタスクデータ保存 |
| Cloudflare Workers | API・通知処理 |
| Cloudflare D1 | Todoデータベース |
| Cloudflare Cron Triggers | 定期実行 |
| Discord Webhook | Discord通知 |
| Git / GitHub | ソースコード管理 |
| GitHub Pages | アプリの公開 |
| GitHub Actions | ビルド・自動デプロイ |

## 開発環境

- Node.js
- npm
- Visual Studio Code

## ローカルでの起動方法

### 1. リポジトリをクローン

```bash
git clone https://github.com/zassou-robo/MyToDo_App.git
cd MyToDo_App
```

### 2. 依存パッケージをインストール

```bash
npm install
```

### 3. 開発サーバーを起動

```bash
npm run dev
```

表示されたURLをブラウザで開くと、アプリを利用できます。

### 4. ビルド

```bash
npm run build
```

本番環境向けのファイルが `dist` ディレクトリに生成されます。

## Cloudflareの設定

Discord通知機能を利用するには、Cloudflare側で以下の設定が必要です。

### 1. Cloudflare Workers

Workerを作成し、フロントエンドからのTodo操作を受け付けます。

### 2. Cloudflare D1

D1データベースを作成し、Workerに `DB` という名前でバインドします。

### 3. Discord Webhook

DiscordのWebhook URLをWorkerのSecretとして設定します。

Secret名：

```text
DISCORD_WEBHOOK_URL
```

Webhook URLは公開リポジトリやフロントエンドのソースコードに記載しないでください。

### 4. Cron Triggers

Workerに以下のCron Triggerを設定します。

```text
0 15 * * *
```

日本時間の毎日0:00に通知処理が実行されます。

## デプロイ

GitHub PagesとGitHub Actionsを利用しています。

`main` ブランチに変更をPushすると、自動的にビルドとデプロイが実行されます。

**公開URL**

https://zassou-robo.github.io/MyToDo_App/

**GitHubリポジトリ**

https://github.com/zassou-robo/MyToDo_App

## 開発期間・開発時間

- 開発期間：2026.10.31 ～ 2026.11.24
- 開発時間：約24時間
