import {
  ApprovalForAll as ApprovalForAllEvent,
  GovernanceUpdated as GovernanceUpdatedEvent,
  IPAccountRegistered as IPAccountRegisteredEvent,
  IPRegistered as IPRegisteredEvent,
  IPResolverSet as IPResolverSetEvent,
  MetadataSet as MetadataSetEvent
} from "../generated/IPAssetRegistry/IPAssetRegistry"
import {
  ApprovalForAll,
  GovernanceUpdated,
  IPAccountRegistered,
  IPRegistered,
  IPResolverSet,
  MetadataSet
} from "../generated/schema"

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.approved = event.params.approved

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleGovernanceUpdated(event: GovernanceUpdatedEvent): void {
  let entity = new GovernanceUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newGovernance = event.params.newGovernance

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleIPAccountRegistered(
  event: IPAccountRegisteredEvent
): void {
  let entity = new IPAccountRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.implementation = event.params.implementation
  entity.chainId = event.params.chainId
  entity.tokenContract = event.params.tokenContract
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleIPRegistered(event: IPRegisteredEvent): void {
  let entity = new IPRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ipId = event.params.ipId
  entity.chainId = event.params.chainId
  entity.tokenContract = event.params.tokenContract
  entity.tokenId = event.params.tokenId
  entity.resolver = event.params.resolver
  entity.provider = event.params.provider
  entity.metadata = event.params.metadata

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleIPResolverSet(event: IPResolverSetEvent): void {
  let entity = new IPResolverSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ipId = event.params.ipId
  entity.resolver = event.params.resolver

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMetadataSet(event: MetadataSetEvent): void {
  let entity = new MetadataSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ipId = event.params.ipId
  entity.metadataProvider = event.params.metadataProvider
  entity.metadata = event.params.metadata

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
