export default class PlayAreaService {
  cards

  buckets

  cardLocale

  // Used to compute probability that card shown is from the new bucket when:

  // 1. hf bucket size < idealHfBucketSize
  maxShouldFillHfDice = 2

  // 2. hf bucket size >= idealHfBucketSize */
  maxShouldShowNewDice = 6

  // Used to compute probability that card shown is from the mastered bucket
  maxShouldShowMasteredDice = 6

  // Higher the card weight, higher the chances of a card being shown

  hfCardWeight = 4 // hf - high frequency

  mfCardWeight = 2 // mf - medium frequency

  lfCardWeight = 1 // lf - low frequency

  hfBucketWeight

  mfBucketWeight

  lfBucketWeight

  minHfBucketSize = 3

  idealHfBucketSize = 6

  maxLearningDice

  constructor(deck) {
    this.cards = deck.cards
    this.buckets = deck.buckets
  }

  getCard() {
    this.hfBucketWeight = this.hfCardWeight * this.buckets.highFreq.length
    this.mfBucketWeight = this.mfCardWeight * this.buckets.mdFreq.length
    this.lfBucketWeight = this.lfCardWeight * this.buckets.lowFreq.length

    if (this.buckets.new.length > 0) {
      if (this.buckets.highFreq.length < this.minHfBucketSize)
        return this.getCardFromNew()
      if (
        this.buckets.highFreq.length < this.idealHfBucketSize &&
        this.getShouldShowNew(true)
      )
        return this.getCardFromNew()
      if (
        this.buckets.highFreq.length >= this.idealHfBucketSize &&
        this.getShouldShowNew(false)
      )
        return this.getCardFromNew()
    }
    if (this.cards.length - this.buckets.mastered.length === 0)
      return this.getCardFromMastered()
    if (this.buckets.mastered.length > 0 && this.getShouldShowMastered())
      return this.getCardFromMastered()
    this.maxLearningDice = this.getMaxLearningDice()
    return this.getCardFromLearning(this.rollLearningDice())
  }

  updateBuckets(isAffirmation) {
    const { bucketName, bucketIndex } = this.cardLocale
    const removed = this.buckets[bucketName].splice(bucketIndex, 1)[0]

    if (!isAffirmation) this.buckets.highFreq.push(removed)
    else if (bucketName === 'highFreq') this.buckets.mdFreq.push(removed)
    else if (bucketName === 'mdFreq') this.buckets.lowFreq.push(removed)
    else if (
      bucketName === 'new' ||
      bucketName === 'lowFreq' ||
      bucketName === 'mastered'
    )
      this.buckets.mastered.push(removed)

    return this.buckets
  }

  getShouldShowMastered() {
    const masteredBucketDice = Math.floor(
      Math.random() * this.maxShouldShowMasteredDice,
    )
    /* Probability that card shown is from the mastered bucket =
    1/maxShouldShowMasteredDice */
    return masteredBucketDice === 0
  }

  getCardFromMastered() {
    const bucketIndex = Math.floor(Math.random() * this.buckets.mastered.length)
    const cardIndex = this.buckets.mastered[bucketIndex]
    this.cardLocale = { bucketName: 'mastered', bucketIndex }
    return {
      ...this.cards[cardIndex],
      badge: { bucket: 'Mastered', variant: 'success' },
    }
  }

  getShouldShowNew(isHfLessThanIdealSize) {
    const newBucketDice = Math.floor(
      Math.random() *
        (isHfLessThanIdealSize
          ? this.maxShouldFillHfDice
          : this.maxShouldShowNewDice),
    )
    /* Probability that card shown is from the new bucket:
    1. When hf bucket size is < idealHfBucketSize =
        (maxShouldFillHfDice-1)/maxShouldFillHfDice
    2. When hf bucket size is >= idealHfBucketSize =
        1/maxShouldShowNewDice */
    return isHfLessThanIdealSize ? newBucketDice !== 0 : newBucketDice === 0
  }

  getCardFromLearning(rand) {
    let bucketIndex
    let cardIndex
    let badge
    if (rand - this.hfBucketWeight < 0) {
      // high freq bucket
      bucketIndex = Math.floor(rand / this.hfCardWeight)
      cardIndex = this.buckets.highFreq[bucketIndex]
      badge = { bucket: 'Learning', variant: 'danger' }
      this.cardLocale = { bucketName: 'highFreq', bucketIndex }
    } else if (rand - this.hfBucketWeight - this.mfBucketWeight < 0) {
      // md freq bucket
      bucketIndex = Math.floor((rand - this.hfBucketWeight) / this.mfCardWeight)
      cardIndex = this.buckets.mdFreq[bucketIndex]
      badge = { bucket: 'Revising', variant: 'threat' }
      this.cardLocale = { bucketName: 'mdFreq', bucketIndex }
    } else if (
      rand - this.hfBucketWeight - this.mfBucketWeight - this.lfBucketWeight <
      0
    ) {
      // low freq bucket
      bucketIndex = Math.floor(
        (rand - this.hfBucketWeight - this.mfBucketWeight) / this.lfCardWeight,
      )
      cardIndex = this.buckets.lowFreq[bucketIndex]
      badge = { bucket: 'Mastering', variant: 'warning' }
      this.cardLocale = { bucketName: 'lowFreq', bucketIndex }
    }
    return { ...this.cards[cardIndex], badge }
  }

  getCardFromNew() {
    const bucketIndex = Math.floor(Math.random() * this.buckets.new.length)
    const cardIndex = this.buckets.new[bucketIndex]
    this.cardLocale = { bucketName: 'new', bucketIndex }
    return {
      ...this.cards[cardIndex],
      badge: { bucket: 'New', variant: 'secondary' },
    }
  }

  getMaxLearningDice() {
    return this.hfBucketWeight + this.mfBucketWeight + this.lfBucketWeight - 1
  }

  rollLearningDice() {
    return Math.floor(Math.random() * (this.maxLearningDice + 1))
  }
}
