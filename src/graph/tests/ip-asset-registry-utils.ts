import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  ApprovalForAll,
  GovernanceUpdated,
  IPAccountRegistered,
  IPRegistered,
  IPResolverSet,
  MetadataSet
} from "../generated/IPAssetRegistry/IPAssetRegistry"

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createGovernanceUpdatedEvent(
  newGovernance: Address
): GovernanceUpdated {
  let governanceUpdatedEvent = changetype<GovernanceUpdated>(newMockEvent())

  governanceUpdatedEvent.parameters = new Array()

  governanceUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newGovernance",
      ethereum.Value.fromAddress(newGovernance)
    )
  )

  return governanceUpdatedEvent
}

export function createIPAccountRegisteredEvent(
  account: Address,
  implementation: Address,
  chainId: BigInt,
  tokenContract: Address,
  tokenId: BigInt
): IPAccountRegistered {
  let ipAccountRegisteredEvent = changetype<IPAccountRegistered>(newMockEvent())

  ipAccountRegisteredEvent.parameters = new Array()

  ipAccountRegisteredEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  ipAccountRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "implementation",
      ethereum.Value.fromAddress(implementation)
    )
  )
  ipAccountRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "chainId",
      ethereum.Value.fromUnsignedBigInt(chainId)
    )
  )
  ipAccountRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "tokenContract",
      ethereum.Value.fromAddress(tokenContract)
    )
  )
  ipAccountRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return ipAccountRegisteredEvent
}

export function createIPRegisteredEvent(
  ipId: Address,
  chainId: BigInt,
  tokenContract: Address,
  tokenId: BigInt,
  resolver: Address,
  provider: Address,
  metadata: Bytes
): IPRegistered {
  let ipRegisteredEvent = changetype<IPRegistered>(newMockEvent())

  ipRegisteredEvent.parameters = new Array()

  ipRegisteredEvent.parameters.push(
    new ethereum.EventParam("ipId", ethereum.Value.fromAddress(ipId))
  )
  ipRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "chainId",
      ethereum.Value.fromUnsignedBigInt(chainId)
    )
  )
  ipRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "tokenContract",
      ethereum.Value.fromAddress(tokenContract)
    )
  )
  ipRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  ipRegisteredEvent.parameters.push(
    new ethereum.EventParam("resolver", ethereum.Value.fromAddress(resolver))
  )
  ipRegisteredEvent.parameters.push(
    new ethereum.EventParam("provider", ethereum.Value.fromAddress(provider))
  )
  ipRegisteredEvent.parameters.push(
    new ethereum.EventParam("metadata", ethereum.Value.fromBytes(metadata))
  )

  return ipRegisteredEvent
}

export function createIPResolverSetEvent(
  ipId: Address,
  resolver: Address
): IPResolverSet {
  let ipResolverSetEvent = changetype<IPResolverSet>(newMockEvent())

  ipResolverSetEvent.parameters = new Array()

  ipResolverSetEvent.parameters.push(
    new ethereum.EventParam("ipId", ethereum.Value.fromAddress(ipId))
  )
  ipResolverSetEvent.parameters.push(
    new ethereum.EventParam("resolver", ethereum.Value.fromAddress(resolver))
  )

  return ipResolverSetEvent
}

export function createMetadataSetEvent(
  ipId: Address,
  metadataProvider: Address,
  metadata: Bytes
): MetadataSet {
  let metadataSetEvent = changetype<MetadataSet>(newMockEvent())

  metadataSetEvent.parameters = new Array()

  metadataSetEvent.parameters.push(
    new ethereum.EventParam("ipId", ethereum.Value.fromAddress(ipId))
  )
  metadataSetEvent.parameters.push(
    new ethereum.EventParam(
      "metadataProvider",
      ethereum.Value.fromAddress(metadataProvider)
    )
  )
  metadataSetEvent.parameters.push(
    new ethereum.EventParam("metadata", ethereum.Value.fromBytes(metadata))
  )

  return metadataSetEvent
}
