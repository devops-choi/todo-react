import React, { useState, useEffect } from 'react';

function PostList() {
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // 컴포넌트가 마운트될 때 (처음 화면에 나타날 때) 실행될 Side Effect를 정의합니다.
    // 두 번째 인자로 빈 배열([])을 넘겨서 이 효과는 마운트 시에만 실행되도록 합니다.
    useEffect(() => {
        // 이곳에 Side Effect 코드를 작성합니다.a
        // 우리는 여기서 데이터를 가져오는 비동기 작업을 수행할 것입니다.

        // 데이터 가져오기가 시작되면 로딩 상태를 true로 설정합니다.
        // setIsLoading(true); // 이미 초기값을 true로 설정했으므로 여기서는 필요 없습니다.

        // 가짜 API에서 데이터를 가져오는 fetch 함수를 사용합니다.
        // fetch는 비동기 함수이므로 Promise를 반환합니다.
        fetch('https://jsonplaceholder.typicode.com/posts')
            // 데이터를 성공적으로 가져오면 응답(response)을 받습니다.
            // .json() 메서드를 사용하여 JSON 형식의 데이터를 파싱합니다.
            .then(response => {
                if(!response.ok) {
                    throw new Error('네트워크 응답이 올바르지 않습니다.');
                }
                return response.json()
            })
            // JSON 파싱이 완료되면 실제 데이터(data)를 받습니다.
            .then(data => {
                // 가져온 데이터(게시글 목록)로 posts 상태를 업데이트합니다.
                setPosts(data);
                // 데이터 로딩이 완료되었으므로 로딩 상태를 false로 설정합니다.
                setIsLoading(false);
            })
            // 만약 데이터 가져오는 도중 오류가 발생하면 catch 블록이 실행됩니다.
            .catch(error => {
                setPosts([]); // 오류 발생 시 posts 상태를 빈 배열로 설정합니다.
                setError(error.message); // 오류 메시지를 상태에 저장합니다.
                // 오류를 콘솔에 출력합니다. 실제 앱에서는 사용자에게 오류 메시지를 보여주는 로직이 필요합니다.
                console.error('데이터 가져오기 오류:', error);
                // 오류 발생 시에도 로딩 상태를 false로 설정하여 로딩 인디케이터를 숨깁니다.
                setIsLoading(false);
            });

        // 이펙트 함수는 필요에 따라 정리(cleanup) 함수를 반환할 수 있습니다.
        // 지금처럼 간단한 fetch 요청에는 필요 없지만, 구독 설정 등에서는 중요합니다.
        return () => {
            // 컴포넌트가 언마운트될 때 (화면에서 사라질 때) 실행됩니다.
            // 여기서는 특별히 정리할 작업이 없습니다.
        };
    }, []); // 빈 배열은 이 이펙트가 컴포넌트 마운트 시에만 실행되게 합니다.

    useEffect(() => {
        // 이곳은 컴포넌트가 업데이트될 때마다 실행되는 이펙트입니다.
        // 현재는 아무 작업도 하지 않습니다.
        // 예를 들어, posts 상태가 변경될 때마다 특정 작업을 수행할 수 있습니다.
        console.log('게시글 목록이 업데이트되었습니다:', posts);
        return () => {
            // 이펙트가 정리될 때 실행되는 함수입니다.
            // 현재는 특별한 작업이 없습니다.
        };
    }, [posts]); // posts 상태가 변경될 때마다 실행됩니다.

    if (error) {
        // 만약 오류가 발생했다면, 오류 메시지를 사용자에게 보여줍니다.
        return (<div>오류 발생: {error}</div>);
    }

    return (
        <div>
            <h1>게시글 목록</h1>
            {isLoading ? (
                <div style={{ width: '20px', height: '20px', border: '4px solid #f3f3f3', borderTop: '4px solid #3498db', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            ) : posts.map((post, index) => (
                <p key={index}>{post.title}</p>
            ))}
        </div>
    )
}

export default PostList;