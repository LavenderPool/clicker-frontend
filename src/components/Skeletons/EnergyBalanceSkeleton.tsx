import ContentLoader from "react-content-loader";

const EnergyBalanceSkeleton = () => {
    return (
        <div style={{height: '18px', width: '100px'}}>
            <ContentLoader viewBox="0 0 100 18"
                           backgroundColor="var(--skeleton-background)"
                           foregroundColor="var(--skeleton-foreground)"
            >
                <rect x="0" y="0" rx="8" ry="8" width="100" height="18"/>
            </ContentLoader>
        </div>
    );
};

export default EnergyBalanceSkeleton;