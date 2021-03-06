import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Media from "react-bootstrap/Media";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import faker from "faker";
import moment from "moment";
import {
  addLike,
  removeLike,
  addComment,
  removeComment,
} from "../actions/feed";

const LikeCommentSection = ({
  addLike,
  removeLike,
  addComment,
  removeComment,
  currUser,
  postId,
  likes,
  liked,
  comments,
}) => {
  const [commentText, setText] = useState("");
  // format  date and time
  const formatDatetime = (timestamp) => {
    const formatDef = "DD-MM-YYYY HH:mm";
    const date = new Date(timestamp);

    const datetime = moment(date).format(formatDef);
    return datetime;
  };

  const renderComments = () =>
    comments.map((comment, index) => (
      <Fragment key={comment.id}>
        <li className="comment-item" key={comment.id}>
          <Image
            className="avatar-comment"
            src={faker.image.avatar()}
            roundedCircle
          />
          <Media.Body>
            <div key={comment.id}>
              <h5 className="comentee-name">{comment.commentee}</h5>
              <p className="comment-text">{comment.commentText}</p>
              <span className="comment-timestamp">
                Commented at: {formatDatetime(comment.createdAt)}
              </span>
              {comment.userId === currUser.id && (
                <i
                  onClick={() => {
                    removeComment(comment.id, currUser.id);
                  }}
                  type="button"
                  className="fas fa-times-circle"
                ></i>
              )}
            </div>
          </Media.Body>
          <br />
        </li>
      </Fragment>
    ));

  return (
    <Card key={postId} className="comment-like-section">
      <Accordion defaultActiveKey="0">
        <Fragment>
          <Button
            onClick={() => {
              if (currUser) {
                !liked
                  ? addLike(postId, currUser.id)
                  : removeLike(postId, currUser.id);
              }
            }}
            className={liked ? "liked" : ""}
          >
            <span>{likes.count} </span>
            <i className="far fa-thumbs-up"></i>
          </Button>
        </Fragment>
        <Accordion.Toggle className="btn btn-info" variant="link" eventKey="1">
          <i className="fas fa-comment"> Comment</i>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <div>
            <Form
              className="row"
              onSubmit={(e) => {
                e.preventDefault();
                if (postId) {
                  addComment(postId, currUser.id, commentText);
                  setText("");
                }
              }}
            >
              <Form.Group
                className="col"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Comment:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                />
                <Button className="mt-2" type="submit">
                  Post
                </Button>
              </Form.Group>
            </Form>
            <div className="row">
              <ul>{renderComments()}</ul>
            </div>
          </div>
        </Accordion.Collapse>
      </Accordion>
    </Card>
  );
};

const mapStateToProps = ({ auth }) => {
  return { currUser: auth.user };
};

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  addComment,
  removeComment,
})(LikeCommentSection);
