import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { publicRoutes } from '~/routes';
import DefaultLayout from '~/layouts';
import { useRef, useEffect } from 'react';
import io from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import { showNotify } from './redux/slice/messageSlice';

const HOST_NAME = process.env.REACT_APP_HOST_NAME;
function App() {
    const dispatch = useDispatch();
    const socket = useRef();

    const currentUser = useSelector(
        (state) => state.auth.login?.currentUser?.user,
    );
    const newMsg = useSelector((state) => state.message.message?.msg);
    console.log(newMsg);

    useEffect(() => {
        socket.current = io(`${HOST_NAME}`);
        currentUser && socket.current.emit('addUser', currentUser?._id);
    }, [currentUser]);

    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page sk={socket && socket} />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
