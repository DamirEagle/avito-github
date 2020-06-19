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
          <div className={s.modal_row}>
            {this.props.data.name}
            {this.props.data.stargazers_count}
            {this.props.data.updated_at}
          </div>
          <div className={s.modal_row}>
            <img src={this.props.data.avatar_url} alt="" />
            {this.props.data.login}
          </div>

          <div className={s.modal_row}>
            {Object.keys(this.props.data.languages).map((lang, index) => {
              console.log("----" + { lang });
              return <div key={index}>{lang}</div>;
            })}
          </div>
          <div className={s.modal_row}>{this.props.data.description}</div>
          <div className={s.modal_row}>
            {
              //this.props.data.contributors.map((contributor, index) => <div key={index}>{contributor.login}</div>)}

              this.props.data.contributors
                .slice(
                  0,
                  this.props.data.contributors.length >= 10
                    ? 10
                    : this.props.data.contributors.length
                )
                .map((contributor, index) => (
                  <div key={index}>{contributor.login}</div>
                ))
            }
            {console.log(this.props.data.contributors)}
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
