const Question = require('./Schema')

exports.getQuestions = async (ctx) => {
    const questions = await Question.find({})
    if (!questions) {
        throw new Error("There was an error")
    } else {
        // ctx.body = tasks
        ctx.body = questions
    }
}

exports.newQuestion = async (ctx) => {
    const question = await Question.create({
        question: ctx.request.body.question
    })
    if (!question) {
        throw new Error("Failed to create")
    } else {
        ctx.body = { message: 'Questions added', data: question}
    }
}