import PostModel from '../models/Post.js'

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec()

    res.json(posts)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'not got articles',
    })
  }
}

export const getOne = async (req, res) => {
  try {

    const postId = req.params.id

    PostModel.findOneAndUpdate({
      //find the article
      _id: postId, 
    
    }, {
      //change param in database
      $inc: { viewsCount: 1 },
    }, {
      //update the article
      returnDocument: 'after', 
    },
      (err, doc) => {
        if (err) {
          console.log(err)
          return res.status(500).json({
            message: 'not returned the article',
          })
        }

        if (!doc) {
          return res.status(404).json({
            message: 'the article not found'
          })
        }

        res.json(doc)
      }
    
    )
    
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'not got articles',
    })
  }
}

export const remove = async (req, res) => {
  try {

    const postId = req.params.id

    PostModel.findOneAndDelete({
      _id: postId,
    }, (err, doc) => {
      if (err) {
        console.log(err)
          return res.status(500).json({
            message: 'not deleted the article',
          })
      }
      if (!doc) {
           console.log(err)
          return res.status(404).json({
            message: 'not found the article',
          })
      }
      res.json({
        success: true,
      })
    })
    
    
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'not got articles',
    })
  }
}

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    })

    const post = await doc.save()
    res.json(post)

  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'not posted'
    })
  }
}

export const update = async (req, res) => {
  try {
    const postId = req.params.id

    await PostModel.updateOne({
      _id: postId,
    }, {
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      user: req.userId,
      tags: req.body.tags,
    })

    res.json({
      success: true,
    })

  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'not updated the article',
    })
  }
}