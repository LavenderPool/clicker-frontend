import ContentLoader from "react-content-loader";

const UserSessionsSkeleton = () => {
    return (
        <div>
            <ContentLoader viewBox="0 0 380 39.5"
                           backgroundColor="var(--skeleton-background)"
                           foregroundColor="var(--skeleton-foreground)"
            >
                <circle cx="20" cy="19.5" r="18" />
                <rect x="56" y="5" rx="4" ry="4" width="169" height="16" />
                <rect x="56" y="27" rx="3" ry="3" width="190" height="10" />
            </ContentLoader>
        </div>
    );
};

export default UserSessionsSkeleton;