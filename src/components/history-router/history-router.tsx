import { useState, useLayoutEffect } from 'react';
import { Router } from 'react-router-dom';
import type { History } from 'history';

export interface HistoryRouterProps {
  history: History;
  basename?: string;
  children?: React.ReactNode;
}

function HistoryRouter({ basename, children, history,}: HistoryRouterProps) {
  const [currentState, setCurrentState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => {
    const unlisten = history.listen(({ location, action }) => {
      setCurrentState({ location, action });
    });

    return () => {
      unlisten();
    };
  }, [history]);

  return (
    <Router
      basename={basename}
      location={currentState.location}
      navigationType={currentState.action}
      navigator={history}
    >
      {children}
    </Router>
  );
}

export default HistoryRouter;