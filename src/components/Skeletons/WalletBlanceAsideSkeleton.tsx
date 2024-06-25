import ContentLoader from "react-content-loader";

const WalletBalanceAsideSkeleton = () => {
    return (
        <div >
            <ContentLoader viewBox="0 0 50 18"
                           style={{height: '18px'}}
                           backgroundColor="var(--skeleton-background)"
                           foregroundColor="var(--skeleton-foreground)"
            >
                <rect x="0" y="0" rx="3" ry="3" width="50" height="18"/>
            </ContentLoader>
        </div>
    );
};

export default WalletBalanceAsideSkeleton;