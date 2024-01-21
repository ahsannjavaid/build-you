import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import NavbarU from '../components/NavbarU'
import { BASE_URL } from '../services/config'

const PostProject = () => {

  const username = useParams().username

  const likes = 0, views = 0
  let projectTag = ""

  let [projectName, setProjectName] = useState('')
  let [projectImage, setProjectImage] = useState('')
  let [projectDescription, setProjectDescription] = useState('')
  let [projectTool, setProjectTool] = useState('')
  let [projectLink, setProjectLink] = useState('')
  let [profiles, setProfiles] = useState([])

  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const getProfiles = async () => {
    let result = await fetch(`${BASE_URL}profiles-details`)
    if (result) {
      result = await result.json()
      setProfiles(result)
    }
    else {
      console.log("Profiles not found!")
    }
  }

  useEffect(() => {
    getProfiles()
  }, [])

  for (let i = 0; i < profiles.length; i++) {
    if (profiles[i].username === username) {
      projectTag = profiles[i].profession
    }
  }

  const handleImageUpload = e => {
    setProjectImage(e.target.files[0])
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  const PostProject = () => {
    var fd = new FormData()
    fd.append("username", username)
    fd.append("projectImage", projectImage)
    fd.append("projectName", projectName)
    fd.append("projectTag", projectTag)
    fd.append("projectTool", projectTool)
    fd.append("projectLink", projectLink)
    fd.append("projectDescription", projectDescription)
    fd.append("likes", likes)
    fd.append("views", views)    
    if (projectName && projectTool) {
      fetch(`${BASE_URL}profile-increment`, {
        method: 'put',
        body: fd
      }).then((res) => {
        res.json().then((data) => {
          console.log(data,"Update API")
        })
      })
      fetch(`${BASE_URL}projects`, {
        method: 'post',
        body: fd
      }).then((res) => {
        res.json().then((data) => {
          console.log(data)
        })
      })
      alert("Successfully posted!")
    }
    else {
      alert("Starred fields are mendatory!")
    }
  }

  return (
    <>
      <NavbarU />
      <section className="h-100 gradient-custom-2">
        <div className="container py-4 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-8">
              <div className="card text-center">
                <h5 className="fw-bold text-center mb-0 mt-2" style={{ letterSpacing: 1 }}>POST YOUR PROJECT</h5>
                <p className='fst-italic text-center mb-2' style={{ color: '#E41221' }}>( Click on the <b>pink</b> screen to upload an image )</p>
                <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: 'rgb(228, 18, 77)', height: 300 }}>
                  <div className='mb-3'>
                    <input type="file" accept="image/*" name="file" onChange={handleImageUpload} ref={imageUploader} style={{ display: "none" }} />
                    <div style={{ height: "300px", width: "734px" }} onClick={() => imageUploader.current.click()}>
                      <img ref={uploadedImage} style={{ width: "100%", height: "100%" }} alt={''} />
                    </div>
                  </div>
                </div>
                <div className="card-body p-4 text-black">
                  <form>
                    <div>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name *</label>
                        <input onChange={(event) => setProjectName(event.target.value)} value={projectName} type="text" className="form-control" id="name" />
                      </div><div className="mb-3">
                        <label htmlFor="tools" className="form-label">Tools/Software used *</label>
                        <input onChange={(event) => { setProjectTool(event.target.value) }} value={projectTool} type="text" className="form-control" id="tools" placeholder="e.g., Adobe Illustrator" />
                      </div><div className="mb-3">
                        <label htmlFor="link" className="form-label">Link (if any)</label>
                        <input onChange={(event) => { setProjectLink(event.target.value) }} value={projectLink} type="text" className="form-control" id="link" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                        <textarea onChange={(event) => { setProjectDescription(event.target.value) }} value={projectDescription} className="form-control" id="exampleFormControlTextarea1" rows={3} />
                      </div>
                    </div>
                    <div className="pt-1">
                      <button onClick={PostProject} className="btn btn-lg btn-dark btn-block" type="submit">Post</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >
    </>
  )
}

export default PostProject