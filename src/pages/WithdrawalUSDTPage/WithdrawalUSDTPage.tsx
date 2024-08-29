import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import styles from './WithDrawalUSDTPage.module.scss'
import i18n from "i18next";
import BalanceSkeleton from "../../components/Skeletons/BalanceSkeleton.tsx";
import {Link} from "react-router-dom";
import {initQRScanner} from "@tma.js/sdk-react";
import {useState} from "react";
import UsdtTransactionService from "../../services/UsdtTransactionService.ts";
import {UserSlice} from "../../store/reducers/UserSlice.ts";
import toast from "react-hot-toast";
import {sendErrorMessage} from "../../utils/helpers.ts";

const WithdrawalUsdtPage = () => {
    const userData = useAppSelector(state => state.UserReducer)
    const [address, setAddress] = useState<string>('')
    const [amount, setAmount] = useState<number>(0)
    const {t} = i18n
    const qrScanner = initQRScanner();
    const {decrementUsdt} = UserSlice.actions
    const dispatch = useAppDispatch()
    const doScanner = () => {
        qrScanner.open('Scan QR code').then((content) => {
            setAddress(content ?? '')
        });
    }

    const createTransaction = async () => {
        try {
            const res = await UsdtTransactionService.create(amount, address)
            dispatch(decrementUsdt(amount))
            toast.success(t('withdrawal.created'), {
                position: "bottom-center",
                className: "black_toast",
            })
            console.log(res);
        }catch (e) {
            sendErrorMessage('server error')
            console.log(e);
        }
    }

    return (
        <div>
            <div className="up">
                <Link to={'/'}>
                    <img src="/svgs/arrow_left.svg" alt=""/>
                </Link>
                <h2 className="page-title">{t('withdrawal')}</h2>
            </div>


            <div className={styles.balance}>
                <img src="/roulette/usdt.png" alt=""/>
                {userData.is_loaded ?
                    <span>{userData.usdt}</span>
                    : <BalanceSkeleton/>}
            </div>

            <div className={`${styles.form} ${userData.usdt == 0 ? 'disabled': ''}`}>
                <div className={styles.form_top}>
                    <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder={"TRC20 ADDRESS"}/>
                    <button onClick={doScanner}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-qr-code-scan" viewBox="0 0 16 16">
                            <path
                                d="M0 .5A.5.5 0 0 1 .5 0h3a.5.5 0 0 1 0 1H1v2.5a.5.5 0 0 1-1 0zm12 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V1h-2.5a.5.5 0 0 1-.5-.5M.5 12a.5.5 0 0 1 .5.5V15h2.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H15v-2.5a.5.5 0 0 1 .5-.5M4 4h1v1H4z"/>
                            <path d="M7 2H2v5h5zM3 3h3v3H3zm2 8H4v1h1z"/>
                            <path d="M7 9H2v5h5zm-4 1h3v3H3zm8-6h1v1h-1z"/>
                            <path
                                d="M9 2h5v5H9zm1 1v3h3V3zM8 8v2h1v1H8v1h2v-2h1v2h1v-1h2v-1h-3V8zm2 2H9V9h1zm4 2h-1v1h-2v1h3zm-4 2v-1H8v1z"/>
                            <path d="M12 9h2V8h-2z"/>
                        </svg>
                    </button>
                </div>
                <div className={styles.form_bottom}>
                    <input
                        value={amount}
                        onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                        type="number"
                        min={0}
                        max={userData.usdt}
                        placeholder={t('withdrawal.amount')}
                    />
                    <button onClick={createTransaction}>{t('withdrawal')}</button>
                </div>
            </div>
        </div>
    );
};

export default WithdrawalUsdtPage;