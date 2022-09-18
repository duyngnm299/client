import Header from '~/Components/Layout/components/Header';

function HeaderOnly({ children }) {
    return (
        <div>
            <Header />
            <div className=".container">
                <div ClassName="content">{children}</div>
            </div>
        </div>
    );
}

export default HeaderOnly;