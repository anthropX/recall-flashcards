export default class PlayAreaService {
  cards

  buckets

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

  getCardFromLearning(rand) {
    let cardIndex
    let badge
    if (rand - this.hfBucketWeight < 0) {
      // high freq bucket
      cardIndex = this.buckets.highFreq[Math.floor(rand / this.hfCardWeight)]
      badge = { bucket: 'Learning', variant: 'danger' }
    } else if (rand - this.hfBucketWeight - this.mfBucketWeight < 0) {
      // md freq bucket
      cardIndex = this.buckets.mdFreq[
        Math.floor((rand - this.hfBucketWeight) / this.mfCardWeight)
      ]
      badge = { bucket: 'Reinforcing', variant: 'threat' }
    } else if (
      rand - this.hfBucketWeight - this.mfBucketWeight - this.lfBucketWeight <
      0
    ) {
      // low freq bucket
      cardIndex = this.buckets.lowFreq[
        Math.floor(
          (rand - this.hfBucketWeight - this.mfBucketWeight) /
            this.lfCardWeight,
        )
      ]
      badge = { bucket: 'Mastering', variant: 'threat' }
    } else {
      // mastered bucket
      cardIndex = this.buckets.mastered[
        Math.floor(
          (rand -
            this.hfBucketWeight -
            this.mfBucketWeight -
            this.lfBucketWeight) /
            this.masteredCardWeight,
        )
      ]
      badge = { bucket: 'Mastered', variant: 'success' }
    }
    return { ...this.cards[cardIndex], badge }
  }

  getCardFromNew() {
    const cardIndex = this.buckets.new[
      Math.floor(Math.random() * this.buckets.new.length)
    ]
    const badge = { bucket: 'New', variant: 'secondary' }
    return { ...this.cards[cardIndex], badge }
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
