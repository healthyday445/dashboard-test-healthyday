import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "20px", fontFamily: "sans-serif", color: "#333" }}>
          <h1 style={{ color: "#d93025" }}>Something went wrong.</h1>
          <p>The application encountered an unexpected error. Please try refreshing the page, or contact support if the issue persists.</p>
          <details style={{ whiteSpace: "pre-wrap", background: "#f1f3f4", padding: "10px", borderRadius: "5px", marginTop: "20px", fontSize: "14px" }}>
            <summary style={{ cursor: "pointer", fontWeight: "bold" }}>Error Details</summary>
            {this.state.error && this.state.error.toString()}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
