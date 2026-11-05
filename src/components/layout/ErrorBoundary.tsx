import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-4 p-6 text-center">
          <h1 className="text-2xl">Ups, ada yang error</h1>
          <p className="text-lg text-tinta-500 dark:text-[#B8AEA3]">Coba muat ulang halaman ini ya.</p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="h-12 rounded-2xl bg-jeruk-500 px-5 text-lg font-medium text-tinta-900"
            >
              Muat Ulang
            </button>
            <a href="/beranda" className="flex h-12 items-center rounded-2xl bg-krem-100 px-5 text-lg text-tinta-900">
              Ke Beranda
            </a>
          </div>
        </main>
      );
    }
    return this.props.children;
  }
}
