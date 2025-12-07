import styles from './civ-tables.module.css';
import CivStats, { civStats } from './civ-stats';

export default function civTables() {
  return <div className={styles.statsTable}>
    <CivStats stats={civStats.slice(0, 17)} />
    <CivStats stats={civStats.slice(17, 34)} />
    <CivStats stats={civStats.slice(34, 50)} />
  </div>;
};
