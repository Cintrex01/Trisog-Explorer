import styles from "./TitleSubHome.module.css";

interface TitleSubHomeProps {
  title: string;
  subtitle: string;
}

const TitleSubHome: React.FC<TitleSubHomeProps> = ({ title, subtitle }) => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div>
          <h3 className={styles.title}>{title}</h3>
        </div>
        <div>
          <h2 className={styles.subtitle}>{subtitle}</h2>
        </div>
      </div>
    </div>
  );
};

export default TitleSubHome;
