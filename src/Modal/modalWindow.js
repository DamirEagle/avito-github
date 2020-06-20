import React, { Component } from "react";
import s from "./modal.module.css";

class modalWindow extends Component {
  closeModal = () => {
    console.log("happened");
    this.props.closeModalFn();
  };

  render() {
    return (
      <div id="myModal" className={s.modal}>
        <div className={s.modal_content}>
          <div className={s.left}>
            <img src={this.props.data.avatar_url} alt="user" />
            <a
              href={this.props.data.html_url}
              alt="author"
              target="_blank"
              rel="noopener noreferrer"
            >
              {this.props.data.login}
            </a>
          </div>
          <div className={s.right}>
            <div className={s.basic_info}>
              <div className={s.info_data}>
                <div className={s.data}>
                  <h4>Name</h4>
                  <p>{this.props.data.name}</p>
                </div>
                <div className={`${s.data} ${s.starsMargin}`}>
                  <h4>Stars</h4>
                  <p>{this.props.data.stargazers_count}</p>
                </div>
                <div className={s.data}>
                  <h4>Update</h4>
                  <p>{this.props.data.updated_at}</p>
                </div>
              </div>
            </div>
            <div className={s.additional_info}>
              <div className={s.add_data}>
                <div className={s.data}>
                  <h4>languages</h4>
                  {Object.keys(this.props.data.languages).map((lang, index) => {
                    console.log("----" + { lang });
                    return (
                      <p key={index} className={s.lang}>
                        {lang}
                      </p>
                    );
                  })}
                </div>
                {this.props.data.description !== null ? (
                  <div className={s.data}>
                    <h4>Description</h4>
                    <p>{this.props.data.description}</p>
                  </div>
                ) : (
                  <div></div>
                )}
                {this.props.data.contributors.length > 0 ? (
                  <div className="data">
                    <h4>Contributors</h4>
                    {this.props.data.contributors
                      .slice(
                        0,
                        this.props.data.contributors.length >= 10
                          ? 10
                          : this.props.data.contributors.length
                      )
                      .map((contributor, index) => (
                        <a
                          href={contributor.html_url}
                          key={index}
                          className={s.contributorLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {contributor.login}
                        </a>
                      ))}
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>

          <div>
            <button onClick={() => this.closeModal()} className={s.close}>
              close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default modalWindow;
