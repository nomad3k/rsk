import React from 'react';
import PropTypes from 'prop-types';
import { FormattedRelative } from 'react-intl';
import { graphql, compose } from 'react-apollo';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import newsQuery from './news.graphql';
import s from './Home.css';

class Home extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      news: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          link: PropTypes.string.isRequired,
          content: PropTypes.string,
        }),
      ),
    }).isRequired,
  };

  render() {
    const {
      data: { loading, reactjsGetAllNews },
    } = this.props;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>React.js News</h1>
          {loading
            ? 'Loading...'
            : reactjsGetAllNews.map(item => (
                <article key={item.link} className={s.newsItem}>
                  <h1 className={s.newsTitle}>
                    <a href={item.link}>{item.title}</a>
                  </h1>{' '}
                  <span className={s.publishedDate}>
                    <FormattedRelative value={item.pubDate} />
                  </span>
                  <div
                    className={s.newsDesc}
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                </article>
              ))}
        </div>
      </div>
    );
  }
}

export default compose(
  withStyles(s),
  graphql(newsQuery),
)(Home);
