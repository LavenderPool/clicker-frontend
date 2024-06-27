import ContentLoader from "react-content-loader";

const UserComponentSkeleton = () => {
    return (
        <div>
            <ContentLoader viewBox="0 0 344 88.5"
                           backgroundColor="var(--skeleton-background)"
                           foregroundColor="var(--skeleton-foreground)"
            >
                <rect x="0" y="0" rx="20" ry="20" width="344" height="88.5"/>
            </ContentLoader>
        </div>
    );
};

export default UserComponentSkeleton;