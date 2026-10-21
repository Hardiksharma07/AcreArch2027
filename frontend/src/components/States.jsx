export const LoadingState = ({ label = 'Loading private listings…' }) => <div className="state"><span className="spinner" /><p>{label}</p></div>;
export const EmptyState = ({ label = 'No properties match this selection.' }) => <div className="state"><i className="fa-regular fa-building" /><p>{label}</p></div>;
export const ErrorState = ({ message, retry }) => <div className="state error"><i className="fa-solid fa-triangle-exclamation" /><p>{message}</p>{retry && <button className="button navy" onClick={retry}>Try Again</button>}</div>;
