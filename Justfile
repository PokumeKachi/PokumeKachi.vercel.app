_default:
    @just --choose

run:
    pnpm install
    pnpm run dev

todo:
    taskwarrior-tui --taskdata .task
