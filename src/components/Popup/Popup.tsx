// @ts-nocheck
import styles from './Popup.module.scss'
interface Props {
    children: React.ReactNode;
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    header: string;
    saveHandler?: boolean;
}

const Index: React.FC<Props> =
    ({children,
         visible,
         setVisible,
         modalSize,
         theme,
         header = "m",
         saveHandler,
     }) => {

        const rootClasses = [styles.modal_chill]

        if (visible) {
            rootClasses.push(styles.active);
        }
        const saveModal = () => {
            saveHandler(true)
            setVisible(false)
        }

        return (
            <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
                <div className={styles.modal_dialog}>
                    <div className={styles.modal_save}>
                        <div className={`${styles.modal} ${styles[modalSize]} ${theme == 'dark' ? 'dark' : ''}`} onClick={(e) => e.stopPropagation()}>

                            <div className={styles.modal_header}>
                                <div className={styles.modal_close} style={{opacity: 0, pointerEvents: "none"}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-x" viewBox="0 0 16 16">
                                        <path
                                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </div>
                                <div>{header}</div>
                                <div className={styles.modal_close} onClick={() => setVisible(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-x" viewBox="0 0 16 16">
                                        <path
                                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </div>
                            </div>

                            <div className={styles.modal_body}>
                                {children}
                            </div>

                            {saveHandler ?
                                <div className={styles.modal_footer}>
                                    <span className={styles.modal_footer_accept} onClick={() => saveModal()}>Сохранить</span>
                                    <BaseButton onClick={() => setVisible(false)} buttonSize={"small"}>Закрыть</BaseButton>
                                </div>: ''
                            }

                        </div>
                    </div>
                </div>

                <div className={styles.modal_overlay} onClick={() => setVisible(false)}></div>


            </div>
        );
    };

export default Index;