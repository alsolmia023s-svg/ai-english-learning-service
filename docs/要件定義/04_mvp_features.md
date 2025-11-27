# 4. MVP機能一覧と優先順位

## 技術スタック
- **Frontend**: Next.js 15 (App Router), MUI (Material UI)
- **Backend**: Next.js API Routes (Server Actions)
- **Database**: MongoDB, Mongoose
- **Auth**: NextAuth.js
- **AI Model**: Claude Haiku 4.5
- **Email**: Nodemailer

## 機能一覧

| カテゴリ | 機能名 | 優先度 | 概要 | 技術要素 |
| --- | --- | --- | --- | --- |
| **認証** | ユーザー登録・ログイン | **Must** | Googleアカウントおよびメールアドレスでの登録・ログイン | NextAuth.js |
| | パスワードリセット | Should | メールによるパスワードリセット機能 | Nodemailer |
| **学習・添削** | 英文入力フォーム | **Must** | ユーザーが添削したいテキストを入力するエリア。文字数カウントなど。 | MUI |
| | AI添削実行 | **Must** | 入力されたテキストをClaude Haiku 4.5 APIに送信し、添削結果を取得する。 | Claude API |
| | 添削結果表示 | **Must** | 修正前後の比較(Diff)表示、修正理由の解説表示。 | Diff Component |
| | フィードバックコピー | Should | 添削結果をクリップボードにコピーする機能。 | Clipboard API |
| **履歴・管理** | 添削履歴一覧 | **Must** | 過去に添削した内容をリスト表示する。 | MongoDB |
| | 履歴詳細表示 | **Must** | 過去の添削結果の詳細を確認できる。 | MongoDB |
| | 履歴削除 | Could | 不要な履歴を削除する。 | MongoDB |
| **その他** | LP (トップページ) | **Must** | サービスの特徴を説明し、登録へ誘導するページ。 | Next.js |
| | お問い合わせフォーム | Could | ユーザーからのフィードバックを受け付ける。 | Nodemailer |

## MVPスコープ外（将来的な機能）
- 音声入力・再生機能
- ユーザー辞書機能
- コミュニティ機能
- 有料プラン決済機能
- ネイティブ講師による人力添削オプション

## 開発フェーズ
1. **Phase 1 (Core)**: 認証、入力、AI添削、結果表示
2. **Phase 2 (History)**: 履歴保存、一覧表示、詳細表示
3. **Phase 3 (Polish)**: UI改善、LP作成、エラーハンドリング強化
