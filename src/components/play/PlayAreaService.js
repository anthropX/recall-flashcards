export default class PlayAreaService {
  cards

  buckets

  cardLocale
  // Higher the card weight, higher the changes of a card being shown

  hfCardWeight = 8 // hf - high frequency

  mfCardWeight = 4 // mf - medium frequency

  lfCardWeight = 2 // lf - low frequency

  masteredCardWeight = 1

  hfBucketWeight

  mfBucketWeight

  lfBucketWeight

  masteredBucketWeight

  minHfBucketSize = 5

  maxRand

  constructor(deck) {
    this.cards = deck.cards
    this.buckets = deck.buckets
  }

  getCard() {
    this.hfBucketWeight = this.hfCardWeight * this.buckets.highFreq.length
    this.mfBucketWeight = this.mfCardWeight * this.buckets.mdFreq.length
    this.lfBucketWeight = this.lfCardWeight * this.buckets.lowFreq.length
    this.masteredBucketWeight =
      this.masteredCardWeight * this.buckets.mastered.length
    if (
      this.buckets.highFreq.length < this.minHfBucketSize &&
      this.buckets.new.length > 0
    )
      return this.getCardFromNew()
    this.maxRand = this.getMaxRand()
    return this.getCardFromLearning(this.getRand())
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
      badge = { bucket: 'Reinforcing', variant: 'threat' }
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
      badge = { bucket: 'Mastering', variant: 'threat' }
      this.cardLocale = { bucketName: 'lowFreq', bucketIndex }
    } else {
      // mastered bucket
      bucketIndex = Math.floor(
        (rand -
          this.hfBucketWeight -
          this.mfBucketWeight -
          this.lfBucketWeight) /
          this.masteredCardWeight,
      )
      cardIndex = this.buckets.mastered[bucketIndex]
      badge = { bucket: 'Mastered', variant: 'success' }
      this.cardLocale = { bucketName: 'mastered', bucketIndex }
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

  getMaxRand() {
    return (
      this.hfBucketWeight +
      this.mfBucketWeight +
      this.lfBucketWeight +
      this.masteredBucketWeight -
      1
    )
  }

  getRand() {
    return Math.floor(Math.random() * (this.maxRand + 1))
  }
}
