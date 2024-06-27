import ContentLoader from "react-content-loader";
import styles from "../../pages/FriendsPage/FriendsPage.module.scss";

const UserComponentSkeleton = () => {
    return (
        <>
            {[0.7, 0.5, 0.3, 0.1].map((opacity, index) => (
                <div className={styles.friends_item} style={{opacity: opacity}} key={index}>
                    <ContentLoader viewBox="0 0 300 31.8"
                                   backgroundColor="var(--skeleton-background)"
                                   foregroundColor="var(--skeleton-foreground)">
                        <circle cx="16" cy="16" r="15.7"/>
                        <rect x="42" y="7" rx="4" ry="4" width="150" height="19"/>
                    </ContentLoader>
                </div>
            ))}
        </>
    );
};

export default UserComponentSkeleton;