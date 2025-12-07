import { Link, useParams } from 'react-router-dom';

const ArticlesDetailForm = () => {
  const { id } = useParams();

  if (!id) return null;

  return (
    <div>
      ...ArticlesDetailForm...{id}
      <Link to="/articles">Return</Link>
    </div>
  );
};

export default ArticlesDetailForm;
