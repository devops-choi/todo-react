import React, { useEffect, useState } from 'react';

function DataFetcher() {
  const [status, setStatus] = useState('loading'); // 'idle', 'loading', 'success', 'error'
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // <<<<<<<<<<<<<<<
  useEffect(() => {
    const timer = setTimeout(() => {
      const success = Math.random() > 0.5;
      if (success) {
        setStatus('success');
        setData('짠! 서버에서 가져온 중요한 데이터!');
        setError(null);
      } else {
        setStatus('error');
        setData(null);
        setError('오류 발생!! 데이터 가져오기 실패!');
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // && = AND = 둘 다 true일 때 true
  // if (A && B)

  // || = OR = 둘 중 하나만 true면 true
  // if (A || B)

  if (status === 'loading') {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <p>{data}</p>
    </div>
  );
}

export default DataFetcher;
