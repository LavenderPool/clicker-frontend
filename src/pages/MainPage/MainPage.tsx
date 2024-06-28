import UserComponent from "../../components/UserComponent/UserComponent";
import ClickService from "../../services/ClickService.ts";

const MainPage = () => {

    const doClick = async () => {
        const res = await ClickService.click()
        console.log(res);
    }

    return (
        <div className={"container"}>
            <UserComponent />


            <button onClick={() => doClick()} style={{padding: '20px', color: '#fff'}}>
                click !
            </button>
        </div>
    );
};

export default MainPage;