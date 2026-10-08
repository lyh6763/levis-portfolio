import { Component, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** 값이 바뀌면(라우트 이동) 오류 상태를 풀고 다시 시도한다. */
  resetKey: string;
};

type State = { failed: boolean };

/**
 * 지연 로딩 청크를 받지 못했을 때(오프라인, 배포 직후 옛 청크가 사라진 경우 등)
 * 앱 전체가 멈추지 않고 이 자리만 안내로 바꾼다.
 */
export class LoadErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidUpdate(previous: Props) {
    if (previous.resetKey !== this.props.resetKey && this.state.failed) {
      this.setState({ failed: false });
    }
  }

  render() {
    if (!this.state.failed) {
      return this.props.children;
    }
    return (
      <div className="load-error" role="alert">
        <p className="load-error__title">페이지를 불러오지 못했습니다.</p>
        <p>네트워크 연결을 확인하거나, 사이트가 막 갱신되었다면 새로고침해 주세요.</p>
        <button type="button" className="load-error__retry" onClick={() => window.location.reload()}>
          새로고침
        </button>
      </div>
    );
  }
}
