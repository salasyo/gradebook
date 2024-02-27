"use server"

import { revalidatePath } from 'next/cache'

import { connectToDatabase } from '@/lib/database'
import Section from '@/lib/database/models/section.model'
import User from '@/lib/database/models/user.model'
import Category from '@/lib/database/models/category.model'
import { handleError } from '@/lib/utils'

import {
  CreateSectionParams,
  UpdateSectionParams,
  DeleteSectionParams,
  GetAllSectionsParams,
  GetSectionsByUserParams,
  GetRelatedSectionsByCategoryParams,
} from '@/types'

const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: 'i' } })
}

const populateSection = (query: any) => {
  return query
    .populate({ path: 'admin', model: User, select: '_id firstName lastName' })
    .populate({ path: 'category', model: Category, select: '_id name' })
}

// CREATE 
export async function createSection({ userId, section, path }: CreateSectionParams) {
  try {
    await connectToDatabase()

    const admin = await User.findById(userId)
    if (!admin) throw new Error('Admin not found')

    const newSection = await Section.create({ ...section, category: section.categoryId, admin: userId })
    revalidatePath(path)

    return JSON.parse(JSON.stringify(newSection))
  } catch (error) {
    handleError(error)
  }
}

// GET ONE SECTION BY ID
export async function getSectionById(sectionId: string) {
  try {
    await connectToDatabase()

    const section = await populateSection(Section.findById(sectionId))

    if (!section) throw new Error('Section not found')

    return JSON.parse(JSON.stringify(section))
  } catch (error) {
    handleError(error)
  }
}

// UPDATE
export async function updateSection({ userId, section, path }: UpdateSectionParams) {
  try {
    await connectToDatabase()

    const sectionToUpdate = await Section.findById(section._id)
    if (!sectionToUpdate || sectionToUpdate.admin.toHexString() !== userId) {
      throw new Error('Unauthorized or section not found')
    }

    const updatedSection = await Section.findByIdAndUpdate(
      section._id,
      { ...section, category: section.categoryId },
      { new: true }
    )
    revalidatePath(path)

    return JSON.parse(JSON.stringify(updatedSection))
  } catch (error) {
    handleError(error)
  }
}

// DELETE
export async function deleteSection({ sectionId, path }: DeleteSectionParams) {
  try {
    await connectToDatabase()

    const deletedSection = await Section.findByIdAndDelete(sectionId)
    if (deletedSection) revalidatePath(path)
  } catch (error) {
    handleError(error)
  }
}

// GET ALL SECTIONS
export async function getAllSections({ query, limit = 6, page, category }: GetAllSectionsParams) {
  try {
    await connectToDatabase()

    const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {}
    const categoryCondition = category ? await getCategoryByName(category) : null
    const conditions = {
      $and: [titleCondition, categoryCondition ? { category: categoryCondition._id } : {}],
    }

    const skipAmount = (Number(page) - 1) * limit
    const sectionsQuery = Section.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const sections = await populateSection(sectionsQuery)
    const sectionsCount = await Section.countDocuments(conditions)

    return {
      data: JSON.parse(JSON.stringify(sections)),
      totalPages: Math.ceil(sectionsCount / limit),
    }
  } catch (error) {
    handleError(error)
  }
}

// GET SECTIONS BY ADMIN
export async function getSectionsByUser({ userId, limit = 6, page }: GetSectionsByUserParams) {
  try {
    await connectToDatabase()

    const conditions = { admin: userId }
    const skipAmount = (page - 1) * limit

    const sectionsQuery = Section.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const sections = await populateSection(sectionsQuery)
    const sectionsCount = await Section.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(sections)), totalPages: Math.ceil(sectionsCount / limit) }
  } catch (error) {
    handleError(error)
  }
}

// GET RELATED SECTIONS: SECTIONS WITH SAME CATEGORY
export async function getRelatedSectionsByCategory({
  categoryId,
  sectionId,
  limit = 3,
  page = 1,
}: GetRelatedSectionsByCategoryParams) {
  try {
    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit
    const conditions = { $and: [{ category: categoryId }, { _id: { $ne: sectionId } }] }

    const sectionsQuery = Section.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const sections = await populateSection(sectionsQuery)
    const sectionsCount = await Section.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(sections)), totalPages: Math.ceil(sectionsCount / limit) }
  } catch (error) {
    handleError(error)
  }
}