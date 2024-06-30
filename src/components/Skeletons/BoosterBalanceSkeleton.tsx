import ContentLoader from "react-content-loader";

const BoosterBalanceSkeleton = () => {
    return (
        <div style={{marginTop: '25px'}}>
            <ContentLoader viewBox="0 0 500 68"
                           backgroundColor="var(--skeleton-background)"
                           foregroundColor="var(--skeleton-foreground)"
            >
                <rect x="25%" y="0" rx="20" ry="20" width="250" height="68"/>
            </ContentLoader>
        </div>
    );
};

export default BoosterBalanceSkeleton;