import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./about.scss";
class About extends Component {
  render() {
    return (
      <>
        <div className="About-container">
          <h2 className="title-about">truyền thông nói gì về nơi này ?</h2>
          <div className="About-content">
            <div className="video-about">
              <iframe
                className="video"
                src="https://www.youtube.com/embed/147SkAVXEqM?list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI"
                title="#51 Kết Thúc Design Giao Diện Clone BookingCare.vn 4 | React.JS Cho Người Mới Bắt Đầu"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
            <div className="img-about">
              <a
                target="_blank"
                className="box-about"
                href="https://vtv.vn/video/ca-phe-khoi-nghiep-14-11-2018-334894.htm"
              >
                <div className="box-img one"></div>
              </a>
              <a
                target="_blank"
                className="box-about"
                href="http://ehealth.gov.vn/?action=News&amp;newsId=46094"
              >
                <div className="box-img two"></div>
              </a>
              <a
                target="_blank"
                className="box-about"
                href="https://vtc.vn/dat-kham-chuyen-khoa-va-hanh-trinh-ho-tro-cac-benh-vien-qua-tai-ar434101.html"
              >
                <div className="box-img three"></div>
              </a>
              <a
                target="_blank"
                className="box-about"
                href="https://ictnews.vn/kinh-doanh/doanh-nghiep/startup-bookingcare-chinh-thuc-ra-mat-phien-ban-di-dong-cua-nen-tang-ho-tro-dat-lich-kham-online-173512.ict"
              >
                <div className="box-img four"></div>
              </a>
              <a
                target="_blank"
                className="box-about"
                href="https://infonet.vietnamnet.vn/da-co-hon-20000-luot-benh-nhan-dat-lich-kham-qua-bookingcare-175080.html"
              >
                <div className="box-img five"></div>
              </a>
              <a
                target="_blank"
                className="box-about"
                href="https://video.vnexpress.net/cuoc-song-4-0/kham-benh-khong-phai-xep-hang-o-ha-noi-3797126.html"
              >
                <div className="box-img six"></div>
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
