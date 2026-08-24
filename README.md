# ひだまり農園

Phaser + TypeScript + Vite で作った、PC・スマホ向け横画面農業ゲームです。

## 起動

```bash
npm install
npm run dev
```

本番ビルドは `npm run build`、確認は `npm run preview` です。

## 操作

- PC: WASD / 矢印キーで移動、Eで近くの畑へアクション
- スマホ: 左の仮想スティックで移動、右の「つかう」でアクション
- 道具は画面下部から選択
- 開発確認用: Tキーで雷雨へ切り替え

にんじんは約25秒で育つため、最初の収穫と販売を短時間で体験できます。セーブは IndexedDB と localStorage バックアップへ自動保存されます。

