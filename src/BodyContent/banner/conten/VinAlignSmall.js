import React from 'react';
import './VinAlignSmall.scss';
import bannerbs from '../../../assets/images/6856742_Mesa de trabajo 1.png';

const VinAlignSmall = () => {
  return (
    <section className="section show-for-small " id="section_1186608303">
      <div className="bg section-bg fill bg-fill bg-loaded">
        {/* Add your background content for the section here */}
      </div>

      <div className="section-content relative">
        <div className="row" id="row-926998775">
          <div className="banner1-2 col small-12 large-12">
            <div className="banner2 col-inner">
              <h2 id="vin-la-gi">
                <span style={{ fontSize: '120%', color: '#00aae7' }}>
                  <strong>FAIRYTEETH LÀ GÌ?</strong>
                </span>
              </h2>
              <p>
                <span style={{ color: '#000000', fontSize: '85%' }}>
                FairyTeeth cung cấp cho bạn và gia đình bạn một dịch vụ nha khoa toàn diện với các phương pháp điều trị tiên tiến nhất được thực hiện với tính chuyên nghiệp tối đa của đội ngũ Bác sĩ và nhân viên có trình độ của chúng tôi.
                </span>
              </p>
              <p>
                <span style={{ color: '#000000', fontSize: '90%' }}>
                  Với thế mạnh về niềng răng không mắc cài bằng khay trong suốt, được thực hiện bởi các bác sĩ chuyên khoa chỉnh nha nhiều năm kinh nghiệm và đội ngũ chuyên viên kỹ thuật phần mềm chuyên nghiệp. Chúng tôi mang đến cho bạn một trải nghiệm hoàn toàn khác biệt về niềng răng với những ưu điểm nổi bật như: tính thẩm mỹ, không đau, vệ sinh dễ dàng, có thể tự tháo lắp, ăn uống bình thường và đặc biệt là thấy trước được kết quả trước khi niềng răng.
                </span>
                
              </p>
              <div className="anhbanner2 py-5">
              
              {/* <p className='py-5 '>
                <img
                  className="aligncenter2"
                  src="http://nhakhoa.maugiaodien.com/wp-content/uploads/2019/02/234.jpg"
                  alt=""
                  width="844"
                  height="600"
                  srcSet="http://nhakhoa.maugiaodien.com/wp-content/uploads/2019/02/234.jpg 844w, http://nhakhoa.maugiaodien.com/wp-content/uploads/2019/02/234-300x213.jpg 300w, http://nhakhoa.maugiaodien.com/wp-content/uploads/2019/02/234-768x546.jpg 768w"
                  sizes="(max-width: 844px) 100vw, 844px"
                />
              </p> */}
          
                
               
        
              


              </div>
              <img
                  className="aligncenter"
                  src={bannerbs} alt="logo"
                />
             
            </div>
           
          </div>
          
        </div>
        
      </div>

      <style scope="scope">
        {`
        #section_1186608303 {
          padding-top: 85px;
          padding-bottom: 85px;
          background-color: rgb(227, 230, 235);
        }
      `}
      </style>
    </section>
  );
};

export default VinAlignSmall;
