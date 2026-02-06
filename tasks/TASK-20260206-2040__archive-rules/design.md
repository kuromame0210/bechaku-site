# Design

目的:
- タスク数が増えても検索と判断のコストが上がらない運用にする。

原則:
- 真実の正は各タスクの status.md に一本化する。
- 一覧ファイルは補助（読みやすさ向上）とする。
- アーカイブはフォルダ移動のみで完結させる。
- AGENTS.md は「どこを見るかだけを書く」制約を守る。

アーカイブ判定基準:
- 完了: Phase 2 完了かつ Gate done のタスク
- 中止: status.md に「Cancelled: yes」を明記したタスク
- 保留: status.md に「On-hold: yes」を明記したタスク
- それ以外はアクティブとして tasks/ 直下に保持

status.md の最小記載ルール:
- Phase: 0/1/2 を必ず書く
- Gate: 0/1/done を必ず書く
- Archive: active / eligible (completed|cancelled|on-hold)
- Updated: YYYY-MM-DD

補助一覧ファイル（任意）:
- ファイル: tasks/index.md
- 目的: 人間が俯瞰しやすい一覧
- 正は status.md なので、index.md は更新忘れがあっても運用は止まらない

AGENTS.md の更新方針:
- ルール本文は書かず、参照先のみ追加する。
- 参照先ファイルは `tasks/ARCHIVE_RULES.md` とする。
- AGENTS.md には「アーカイブ運用は tasks/ARCHIVE_RULES.md を参照」と明記する。

AGENTS.md の具体的な変更内容（追記箇所と文言）:
- 追記セクション: 「各ファイルの役割」内の AGENTS.md の説明末尾
- 追記文言（1行）:
  - アーカイブ運用の詳細は `tasks/ARCHIVE_RULES.md` を参照する。

運用手順:
- タスク終了時または週次で status.md を更新
- Archive: eligible になったら tasks/archive/YYYY/ へ移動
- 移動後も status.md を保持（唯一の正）

フォルダ構成:
- tasks/ (アクティブのみ)
- tasks/archive/YYYY/ (完了・中止・保留)
- tasks/ARCHIVE_RULES.md (アーカイブ運用の詳細)

例:
- tasks/archive/2026/TASK-20260206-2040__archive-rules/
