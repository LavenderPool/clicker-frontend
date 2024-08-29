import styles from './Popup.module.scss'
interface Props {
    children: React.ReactNode;
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    header: string;
}

const Index: React.FC<Props> =
    ({children,
         visible,
         setVisible,
         header = "m",
     }) => {

        const rootClasses = [styles.modal_chill]

        if (visible) {
            rootClasses.push(styles.active);
        }

        return (
            <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
                <div className={styles.modal_dialog}>
                    <div className={styles.modal_save}>
                        <div className={`${styles.modal}`} onClick={(e) => e.stopPropagation()}>
                            {header ?
                                <div className={styles.modal_header}>
                                    <div>{header}</div>
                                </div> : null}


                            <div className={styles.modal_body}>
                            {children}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.modal_overlay} onClick={() => setVisible(false)}></div>


            </div>
        );
    };

export default Index;