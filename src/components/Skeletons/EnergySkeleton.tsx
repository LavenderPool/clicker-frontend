import ContentLoader from "react-content-loader";

const EnergySkeleton = () => {
    return (
        <div>
            <ContentLoader viewBox="0 0 344 12"
                           backgroundColor="var(--skeleton-background)"
                           foregroundColor="var(--skeleton-foreground)"
                           style={{ marginBottom: '26px' }}
            >
                <rect x="0" y="0" rx="8" ry="8" width="344" height="12"/>
            </ContentLoader>
        </div>
    );
};

export default EnergySkeleton;