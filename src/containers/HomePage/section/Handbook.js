import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./Handbook.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class HandBook extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };

    return (
      <>
        <div className="section-handbook">
          <div className="handbook-content">
            <button className="see-more">see more</button>
            <h2 className="title-handbook">cẩm nang</h2>
            <Slider {...settings}>
              <div className="handbook-child">
                <div className="child-box">
                  <div className="handbook-img"></div>
                  <p className="title-child">
                    chuyên tư vấn sức khỏe tâm lý , chứng bệnh overthinking của
                    giới trẻ hiện nay{" "}
                  </p>
                </div>
                <span>handbook-content</span>
              </div>
              <div className="handbook-child">
                <div className="child-box">
                  <div className="handbook-img"></div>
                  <p className="title-child">
                    chuyên tư vấn sức khỏe tâm lý , chứng bệnh overthinking của
                    giới trẻ hiện nay{" "}
                  </p>
                </div>
                <span>handbook-content</span>
              </div>
              <div className="handbook-child">
                <div className="child-box">
                  <div className="handbook-img"></div>
                  <p className="title-child">
                    chuyên tư vấn sức khỏe tâm lý , chứng bệnh overthinking của
                    giới trẻ hiện nay{" "}
                  </p>
                </div>
                <span>handbook-content</span>
              </div>
              <div className="handbook-child">
                <div className="child-box">
                  <div className="handbook-img"></div>
                  <p className="title-child">
                    chuyên tư vấn sức khỏe tâm lý , chứng bệnh overthinking của
                    giới trẻ hiện nay{" "}
                  </p>
                </div>
                <span>handbook-content</span>
              </div>
              <div className="handbook-child">
                <div className="child-box">
                  <div className="handbook-img"></div>
                  <p className="title-child">
                    chuyên tư vấn sức khỏe tâm lý , chứng bệnh overthinking của
                    giới trẻ hiện nay{" "}
                  </p>
                </div>
                <span>handbook-content</span>
              </div>
              <div className="handbook-child">
                <div className="child-box">
                  <div className="handbook-img"></div>
                  <p className="title-child">
                    chuyên tư vấn sức khỏe tâm lý , chứng bệnh overthinking của
                    giới trẻ hiện nay{" "}
                  </p>
                </div>
                <span>handbook-content</span>
              </div>
            </Slider>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
