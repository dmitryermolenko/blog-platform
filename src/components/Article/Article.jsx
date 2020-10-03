import React from "react";
import ReactMarkdown from "react-markdown";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Button } from "antd";
import classes from "./Article.module.scss";

const Article = ({ article, isFull = false, user = {} }) => {
  const history = useHistory();
  const { username: currentUser } = user;
  if (article) {
    const {
      title,
      slug,
      body,
      createdAt,
      tagList,
      description,
      author: { username, image },
      favoritesCount,
    } = article;

    return (
      <article className={classes.article}>
        <header className={classes["article__header"]}>
          <div className={classes["article__left"]}>
            <div className={classes["article__title-wrapper"]}>
              <h2 className={classes["article__title"]}>
                <Link
                  className={classes["article__link"]}
                  to={`/articles/${slug}`}
                >
                  {title}
                </Link>
              </h2>
              <button className={classes["article__likes"]}>
                {favoritesCount}
              </button>
            </div>
            <span className={classes["article__tags"]}>{tagList}</span>
            <p className={classes["article__description"]}>{description}</p>
          </div>
          <div className={classes["article__right"]}>
            <div className={classes["article__userinfo"]}>
              <span>{username}</span>
              <span>{createdAt}</span>
            </div>
            <img
              className={classes["article__avatar"]}
              src={image}
              width="46"
              height="46"
              alt="Avatar"
            ></img>
            {isFull && username === currentUser ? (
              <div className={classes["article__buttons"]}>
                <Button className={classes["article__delete"]} type="danger">
                  Delete
                </Button>
                <Button
                  className={classes["article__edit"]}
                  type="primary"
                  onClick={() => history.push(`/articles/${slug}/edit`)}
                >
                  Edit
                </Button>
              </div>
            ) : null}
          </div>
        </header>
        <section className={classes["article__body"]}>
          {isFull ? <ReactMarkdown source={body} /> : null}
        </section>
      </article>
    );
  }

  return null;
};
const mapStateToProps = ({ userData: { user } }) => ({ user });
export default connect(mapStateToProps)(Article);
