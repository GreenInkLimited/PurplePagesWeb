import React from 'react'
import { blog } from '../../data';
import Blog from '../../assets/BlogHeader1.png'
import Autor from '../../assets/Autor3.png'
import Comment from '../../assets/comment.png'
import {AiOutlineLike, AiOutlineShareAlt} from 'react-icons/ai'
import {BsBookmark} from 'react-icons/bs'
import {RiArrowDropDownLine} from 'react-icons/ri'
import { Link, useParams } from 'react-router-dom';



const BlogDetail = () => {
  const { id } = useParams();
  const event = blog.find(event => event.id === parseInt(id));
  return (
    <div className='container blog__detail'>
      <div className="blog__detail-header">
        <h2>{event.title}</h2>
        <div className='blog__bottom'>
                    <img src={event.autor} alt="autor" />
                    <div className="blog__bottom-detail">
                        <p>{event.name}</p>
                        <small>{event.date}</small>
                    </div>
                </div>
      </div>
      <div className='blog__detail-content'>
        <img src={event.bg} />
      </div>
      <div className='blog__body'>
        <div className="blog__body_left">
        <p>Lorem ipsum dolor sit amet consectetur. A volutpat sit netus amet proin ut. Cursus purus diam lectus sit nibh sollicitudin justo facilisi pharetra. Velit ornare in blandit egestas suspendisse habitasse mollis sem semper. Eu auctor senectus risus egestas sed vulputate amet aliquam tortor. Cras nec turpis nisi est. Augue lacus sollicitudin vitae ante ut magna sit. Ut tellus non purus auctor. Odio amet eget duis condimentum ultricies eget id viverra bibendum. Faucibus ante dolor mauris scelerisque.
          <br/><br/><br/>
Fermentum magnis sem fermentum at tristique a. Aenean viverra ut pellentesque dolor et rhoncus velit. Eget tortor auctor odio tellus et. Imperdiet non nisl nullam mi. Convallis ut pharetra vel posuere pellentesque. Integer sed id pulvinar non sed pharetra. Ut phasellus vivamus molestie pulvinar auctor augue porttitor. Amet a praesent massa aliquet at vitae arcu. Sed id tortor urna purus justo sed facilisis porttitor.
          <br/><br/><br/>
Facilisi sed dolor justo natoque orci sit. Eget in donec sit vitae semper tempus habitasse arcu metus. Nascetur sed magna id consectetur volutpat neque. Tincidunt pulvinar nulla massa elementum placerat diam. Lacus ullamcorper etiam pellentesque sociis aliquam tempus est. Lobortis sit lacus velit neque et quisque nisi. At scelerisque ornare pellentesque feugiat. Cursus a vitae in integer in at vitae. Arcu elementum leo amet nibh est ac sed tincidunt volutpat. Amet ante at cursus a volutpat. Sapien lobortis feugiat eget pellentesque rhoncus lectus aliquam nunc orci. A amet molestie platea tellus feugiat amet. Condimentum in tortor volutpat interdum in ultricies sit. Ut ipsum augue lectus augue aliquam purus arcu. Aliquet.</p>
        <div className='blog__tags'>
          
          <p>Food&Drinks</p>
          <p>Health</p>
          <p>Diet</p>
          <p>Lorep</p>
        </div>
        <div className='blog__actions'>
          <div className="blog__actions-left">
            <AiOutlineLike />
            <p>12</p>
          </div>
          <div className="blog__actions-right">
            <BsBookmark />
            <AiOutlineShareAlt />
          </div>
        </div>
        <div className='comment__flexbox'>

          <textarea placeholder='leave a comment' className='input-box'/>
          <button className='post'>Post</button>
        </div>
        <div className="blog__recent-post">
          <div className="recent__post-header">
          <h4>MOST RECENT</h4>
          <RiArrowDropDownLine />
          </div>
          <div className="blog__comment-body">
          <img src={Comment} />
          <div>
            <p>Purplepages01</p>
            <div className="reply__comment">
            <small>Love this piece, so informative. Keep it up purple closet👏</small>
            
              <p>Reply</p>
            </div>
          </div>
        </div>
        <div className="blog__comment-body">
          <img src={Comment} />
          <div>
            <p>Purplepages01</p>
            <div className="reply__comment">
            <small>Love this piece, so informative. Keep it up purple closet👏</small>
            
              <p>Reply</p>
            </div>
          </div>
        </div>
        </div>
        </div>
        <div>
        <div className="blog__body__right">
          
          <img src={Blog} />
          <h4>Smart money moves</h4>
          <p>Managing your finances can be a daunting task, but it doesn't have ...</p>
          <div className='blog__body__autor'>
            <img src={Autor} />
            <div>
            <p>Smart Money Lady</p>
            <small>December 21, 2022</small>
            </div>
          </div>
        </div>
        <div className="blog__body__right">
         
          <img src={Blog} />
          <h4>Smart money moves</h4>
          <p>Managing your finances can be a daunting task, but it doesn't have ...</p>
          <div className='blog__body__autor'>
            <img src={Autor} />
            <div>
            <p>Smart Money Lady</p>
            <small>December 21, 2022</small>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default BlogDetail