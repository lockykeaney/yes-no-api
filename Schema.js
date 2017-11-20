const mongoose = require('mongoose')

const QuestionSchema = mongoose.Schema = {
    question: String,
    yesVotes: { type: Number, default: 0 },
    noVotes: { type: Number, default: 0 }
}

module.exports = mongoose.model("Question", QuestionSchema)