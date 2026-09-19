/** ============================================================
 *  ErrorBoundary — حد أخطاء عام يمنع الشاشة البيضاء
 *  ============================================================ */

import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}
interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("TiQ crashed:", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-dvh flex-col items-center justify-center gap-4 p-8 text-center" dir="rtl">
          <div className="text-5xl">⚽</div>
          <h1 className="text-xl font-black">حدث خطأ غير متوقع</h1>
          <p className="max-w-sm text-sm opacity-60">
            نعتذر، حدث خلل بسيط. جرّب إعادة تحميل الصفحة.
          </p>
          <button
            onClick={() => location.reload()}
            className="rounded-2xl bg-grass-600 px-6 py-3 text-sm font-black text-white shadow-md transition-colors hover:bg-grass-700"
          >
            إعادة التحميل
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
